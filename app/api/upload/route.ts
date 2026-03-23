import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const formData = await request.formData();
  const files = formData.getAll('files');

  const uploaded = files.map((file, index) => ({
    id: `mock-file-${index + 1}`,
    name: file instanceof File ? file.name : `attachment-${index + 1}`,
    url: `/uploads/mock-file-${index + 1}`
  }));

  return NextResponse.json({ uploaded });
}
