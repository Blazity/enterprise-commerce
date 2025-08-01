import { useState } from "react"

import { useQueryState } from "nuqs"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { useModalStore } from "stores/modal-store"

import { cn } from "utils/cn"

import { Form } from "components/ui/form"
import { submitReview } from "app/actions/reviews.actions"
import { StarIcon } from "components/icons/star-icon"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "components/ui/dialog"
import { Button } from "components/ui/button-old"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "components/ui/form"
import { Textarea } from "components/ui/textarea"
import { Input } from "components/ui/input"

const formSchema = z.object({
  email: z.string().email({ message: "Provide email address" }).min(3).max(64),
  name: z.string().min(3, { message: "Your name must be at least 3 characters long" }),
  rating: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]),
  body: z.string().min(3, { message: "Write something about the product" }),
})

export function ReviewModal() {
  const modals = useModalStore((s) => s.modals)
  const closeModal = useModalStore((s) => s.closeModal)
  const [pid, setPid] = useQueryState("pid", {
    clearOnDefault: true,
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rating: 1,
      body: "",
      name: "",
      email: "",
    },
  })

  async function onSubmit(payload: z.infer<typeof formSchema>) {
    try {
      if (!pid) {
        toast.error("There was an error submitting your review. Please try again.")
        return
      }

      await submitReview({ ...payload, id: pid })
      toast.success("Your review has been submitted successfully.")
      setPid(null)
      closeModal("review")
    } catch (err) {
      console.error(err)
      toast.error("There was an error submitting your review. Please try again.")
    }
  }

  return (
    <Dialog
      open={!!modals["review"]}
      onOpenChange={() => {
        setPid(null)
        closeModal("review")
      }}
    >
      <DialogContent className="bg-white p-6 sm:max-w-[625px]">
        <Form {...form}>
          {form.formState.errors.root?.message && (
            <p className="mt-6 w-full text-[14px] leading-tight tracking-tight text-red-400">
              {form.formState.errors.root?.message}abc{" "}
            </p>
          )}
          <form name="reviewForm" id="reviewForm" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader className="border-b border-black/10 pb-4">
              <DialogTitle className="text-2xl">Leave a Review</DialogTitle>
              <DialogDescription className="">Share your thoughts and experience with this product.</DialogDescription>
            </DialogHeader>
            <FormField
              key="rating"
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem className="text-center">
                  <FormLabel>Rating</FormLabel>
                  <FormMessage className="text-xs font-normal text-red-400" />
                  <FormControl>
                    <StarList rating={field.value} setRating={field.onChange} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              key="body"
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your review</FormLabel>
                  <FormMessage className="text-xs font-normal text-red-400" />
                  <FormControl>
                    <Textarea
                      autoFocus
                      className="max-h-96 text-base"
                      id="review"
                      placeholder="Share your thoughts..."
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-2">
              <FormField
                key="name"
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Name</FormLabel>
                    <FormMessage className="text-xs font-normal text-red-400" />
                    <FormControl>
                      <Input type="text" placeholder="John Doe" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                key="email"
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Email Address</FormLabel>
                    <FormMessage className="text-xs font-normal text-red-400" />
                    <FormControl>
                      <Input type="text" placeholder="contact@blazity.com" {...field} />
                    </FormControl>
                    <FormDescription className="text-xs text-gray-400">
                      We will never share your email with anyone else.
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
        <DialogFooter className="flex-row justify-end space-x-2">
          <Button
            variant="outline"
            onClick={() => {
              setPid(null)
              closeModal("review")
            }}
            className="border-none text-sm font-medium underline-offset-2 hover:underline"
          >
            Cancel
          </Button>
          <Button
            className="flex items-center justify-center border-none bg-black text-center text-sm font-medium text-white hover:bg-black/85 hover:text-white"
            form="reviewForm"
            variant="secondary"
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            Submit Review
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function StarList({
  name,
  rating,
  setRating,
  ...rest
}: {
  name: string
  rating: number
  setRating: (rating: number) => void
}) {
  const [hover, setHover] = useState(0)

  return (
    <div className="p-1">
      <fieldset className="flex items-center justify-center">
        <legend className="sr-only">Choose a rating</legend>
        {Array.from({ length: 5 }).map((_, i) => (
          <label key={i} className="relative cursor-pointer">
            <Input
              type="radio"
              id={`${i + 1}`}
              name={name}
              value={i + 1}
              {...rest}
              className="absolute inset-0 size-full p-4 opacity-0"
              onChange={() => setRating(i + 1)}
              onMouseEnter={() => setHover(i + 1)}
              onMouseLeave={() => setHover(0)}
            />
            <StarIcon
              className={cn("size-8 fill-gray-300", (hover || rating) > i ? "fill-black/90" : "text-gray-300")}
            />
          </label>
        ))}
      </fieldset>
    </div>
  )
}
