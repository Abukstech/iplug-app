import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import prisma from '../../../../lib/prisma';
import sharp from 'sharp';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_KEY!);

// Initialize the model
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash"
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const image = formData.get('image') as File;
    
    if (!image) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    // Convert image to buffer and process it
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const processedImageBuffer = await sharp(buffer)
      .jpeg()
      .toBuffer();

    // Convert to base64
    const base64String = processedImageBuffer.toString('base64');

    // Analyze the image
    const result = await model.generateContent([
      "What smartphone model is shown in this image? Just return the exact model name.",
      { inlineData: { data: base64String, mimeType: 'image/jpeg' } }
    ]);

    const response = await result.response;
    const deviceName = response.text();
    console.log('Device detected:', deviceName);

    // Extract the brand name (e.g., "iPhone" from "iPhone 12")
    const brandName = deviceName.split(' ')[0];

    // Search database for matching products
    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: brandName,
          mode: 'insensitive'
        }
      }
    });

    if (products.length > 0) {
      return NextResponse.json({ products });
    } else {
      return NextResponse.json({ error: 'No matching products found' }, { status: 404 });
    }

  } catch (error) {
    console.error('Visual search error:', error);
    return NextResponse.json(
      { error: 'Failed to process image' },
      { status: 500 }
    );
  }
}