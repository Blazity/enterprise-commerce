"use client";

import type { ChatRequestOptions, CreateMessage, Message } from "ai";
import { useChat, experimental_useObject as useObject } from "ai/react";
import * as React from "react";
import { z } from "zod";

interface AiCommerceContextType {
	messages: Message[];
	append: (
		message: Message | CreateMessage,
		chatRequestOptions?: ChatRequestOptions,
	) => Promise<string | null | undefined>;
	input: string;
	isLoading: boolean;
	handleSubmit: (e?: { preventDefault: () => void }) => void;
	setInput: (value: string) => void;
	createNewSuggestions: (messages: Message[]) => void;
	suggestionsStream: string[];
}

const AiCommerceContext = React.createContext<
	AiCommerceContextType | undefined
>(undefined);

export function useAiCommerce() {
	const context = React.useContext(AiCommerceContext);
	if (!context) {
		throw new Error("useAiCommerce must be used within an AiCommerceProvider");
	}
	return context;
}

interface AiCommerceProviderProps {
	children: React.ReactNode;
}

export function AiCommerceProvider({ children }: AiCommerceProviderProps) {
	const { append, messages, input, handleSubmit, setInput, isLoading } =
		useChat({
			api: "/api/search",
			maxSteps: 10,
		});

	const { object: suggestionsStream, submit: createNewSuggestions } = useObject(
		{
			api: "/api/suggestions",
			schema: z.array(z.string()),
		},
	);

	const value = React.useMemo(
		() => ({
			messages,
			input,
			isLoading,
			handleSubmit,
			setInput,
			append,
			createNewSuggestions,
			suggestionsStream: suggestionsStream?.length
				? suggestionsStream.filter(Boolean)
				: [],
		}),
		[
			messages,
			input,
			isLoading,
			handleSubmit,
			setInput,
			append,
			suggestionsStream,
			createNewSuggestions,
		],
	);

	return (
		<AiCommerceContext.Provider value={value}>
			{children}
		</AiCommerceContext.Provider>
	);
}
