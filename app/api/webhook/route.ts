import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { CreateUser, deleteUser, updateUser } from "@/lib/actions/user.action";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new SVIX instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Get the ID and type
  const { id } = evt.data;
  const eventType = evt.type;

  console.log(`Webhook with and ID of ${id} and type of ${eventType}`);
  console.log("Webhook body:", body);
  if (eventType === "user.created") {
    const {
      id,
      email_addresses: emailAddresses,
      image_url: imageUrl,
      username,
      first_name: firstName,
      last_name: lastName,
    } = evt.data;

    const mongoUser = await CreateUser({
      clerkId: id,
      email: emailAddresses[0].email_address,
      name: `${firstName} ${lastName || ""}`,
      picture: imageUrl,
      username: username!,
    });

    return NextResponse.json({ message: "ok", user: mongoUser });
  }
  if (eventType === "user.updated") {
    const {
      id,
      email_addresses: emailAddresses,
      image_url: imageUrl,
      username,
      first_name: firstName,
      last_name: lastName,
    } = evt.data;

    const mongoUser = await updateUser({
      clerkId: id,
      updateData: {
        email: emailAddresses[0].email_address,
        name: `${firstName} ${lastName || ""}`,
        picture: imageUrl,
        username: username!,
      },
      path: `/profile/${id}`,
    });

    return NextResponse.json({ message: "ok", user: mongoUser });
  }

  if (eventType === "user.deleted") {
    const { id } = evt.data;

    const mongoUser = await deleteUser({ clerkId: id! });

    return NextResponse.json({ message: "ok", user: mongoUser });
  }
  return new Response("", { status: 201 });
}
