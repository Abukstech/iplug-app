import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';


export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    
    let query: any = {};
    
    if (category) {
      query.category = category;
    }
    
    if (search) {
      query.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }

    const products = await prisma.product.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      name, description, price, images, category, stock,
      storage, ram, camera, display, battery, processor 
    } = body;

    if (!name || !description || !price || !images?.length || !category || stock === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (images.some((url: string) => !url)) {
      return NextResponse.json(
        { error: 'All image URLs must be provided' },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        images,
        category,
        stock: parseInt(stock),
        storage: storage || null,
        ram: ram || null,
        camera: camera || null,
        display: display || null,
        battery: battery || null,
        processor: processor || null
      }
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}