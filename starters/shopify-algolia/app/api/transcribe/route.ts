import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { Buffer } from 'buffer';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function blobToBuffer(blob: Blob) {
  const arrayBuffer = await blob.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

function getFileExtension(mimeType: string) {
  const mimeMap: Record<string, string> = {
    'audio/webm': 'webm',
    'audio/mp3': 'mp3',
    'audio/mp4': 'mp4',
    'audio/mpeg': 'mp3',
    'audio/wav': 'wav',
    'audio/ogg': 'ogg',
    'audio/x-m4a': 'mp3',
  };

  return mimeMap[mimeType] || 'mp3';
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const audioFile = formData.get('audio');

    if (!audioFile) {
      return NextResponse.json(
        { error: 'No audio file provided' },
        { status: 400 }
      );
    }

    if (!(audioFile instanceof Blob)) {
      return NextResponse.json(
        { error: 'Invalid audio data' },
        { status: 400 }
      );
    }

    const fileExt = getFileExtension(audioFile.type);
    console.log(`Audio format: ${audioFile.type}, using extension: ${fileExt}`);

    const buffer = await blobToBuffer(audioFile);
    
    const file = new File([buffer], `audio.${fileExt}`, { type: audioFile.type });

    const transcription = await openai.audio.transcriptions.create({
      file,
      model: 'whisper-1',
      response_format: 'json',
      language: 'en',
      temperature: 0,
    });

    return NextResponse.json({ text: transcription.text });
  } catch (error) {
    console.error('Transcription error:', error);

    if (error instanceof OpenAI.APIError) {
      return NextResponse.json(
        { error: `OpenAI API error: ${error.message}` },
        { status: error.status || 500 }
      );
    }
    
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}