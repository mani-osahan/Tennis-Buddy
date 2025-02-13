"use client";
import { supabase } from "@/app/lib/supabase/client";
import { useEffect, useState } from "react";

export default function Matchmaking() {
  const [data, setData] = useState(null);

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
