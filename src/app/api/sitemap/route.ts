// src/app/api/sitemap/route.ts
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { generateAllSitemaps } from '@/lib/sitemap/generator';
import { revalidatePath } from 'next/cache';
export async function GET() {
    try {
      await generateAllSitemaps();

      revalidatePath('/products');
      revalidatePath('/sitemaps/sitemap.xml');
      revalidatePath('/sitemaps/sitemap-products.xml');
      
      return NextResponse.json({
        success: true,
        message: 'Sitemap hierarchy regenerated'
      });
    } catch (error) {
      console.error('Generation error:', error);
      return NextResponse.json(
        { success: false, error: 'Sitemap generation failed' },
        { status: 500 }
      );
    }
  }         