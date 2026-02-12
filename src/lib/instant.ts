import { init } from "@instantdb/react";
import type schema from "../../instant.schema";

const APP_ID = process.env.NEXT_PUBLIC_INSTANT_APP_ID ?? "";

export const db = init<typeof schema>({ appId: APP_ID });
