import { NextResponse } from 'next/server';

const mondayEndpoint = 'https://api.monday.com/v2';

async function uploadFiles(files: File[]) {
  const uploadForm = new FormData();
  files.forEach((file) => uploadForm.append('files', file));

  const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/upload`, {
    method: 'POST',
    body: uploadForm
  });

  if (!response.ok) {
    throw new Error('Unable to upload supporting files.');
  }

  const payload = (await response.json()) as { uploaded: Array<{ id: string; name: string; url: string }> };
  return payload.uploaded;
}

async function createMondayItem(data: Record<string, unknown>) {
  const token = process.env.MONDAY_API_TOKEN;
  const boardId = process.env.MONDAY_BOARD_ID;

  if (!token || !boardId) {
    return { simulated: true };
  }

  const mutation = `mutation CreateItem($boardId: ID!, $itemName: String!, $columnValues: JSON!) {
    create_item(board_id: $boardId, item_name: $itemName, column_values: $columnValues) { id }
  }`;

  const columnValues = JSON.stringify({
    email: data.email,
    text: data.company,
    long_text: data.notes,
    numbers: data.quantity,
    timeline: data.timeline
  });

  const response = await fetch(mondayEndpoint, {
    method: 'POST',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: mutation,
      variables: {
        boardId,
        itemName: String(data.projectName || 'Polymer Connection RFQ'),
        columnValues
      }
    })
  });

  if (!response.ok) {
    throw new Error('Failed to create Monday.com item.');
  }

  return response.json();
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files').filter((item): item is File => item instanceof File);

    const payload = Object.fromEntries(formData.entries());

    if (!payload.fullName || !payload.email || !payload.projectName) {
      return NextResponse.json({ message: 'Missing required RFQ fields.' }, { status: 400 });
    }

    const uploadedFiles = await uploadFiles(files);
    await createMondayItem({ ...payload, files: uploadedFiles });

    return NextResponse.json({
      message: `RFQ submitted successfully for ${payload.projectName}. ${uploadedFiles.length} file(s) processed.`
    });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Unable to submit RFQ.' },
      { status: 500 }
    );
  }
}
