/* eslint-disable @typescript-eslint/no-explicit-any */
import { UploadImage } from "@/config/cloudinary.config";
// 

// Assuming formData is already populated
// export const dynamic = 'force-dynamic'
export async function POST(req: Request) {
  if (req.method === "POST") {
    try {
      const formData = await req.formData()
      const imageFile = formData.get('formData')
      const blob = imageFile as Blob
      if (!imageFile) {
        throw new Error('No file uploaded');
      }
      const buffer = Buffer.from(await blob.arrayBuffer());
      const url = await UploadImage(buffer);
      return new Response(JSON.stringify({ url }), { status: 201 })
    } catch (e: any) {
      return new Response(JSON.stringify({ error: e.message }), { status: 400 })
    }
  } else {
    return new Response(JSON.stringify({ error: "only post request is supported" }), { status: 400 })
  }
}