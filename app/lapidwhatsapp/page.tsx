"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

type Gender = "male" | "female" | "other";

export default function WhatsAppGenerator() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [gender, setGender] = useState<Gender>("male");
  const [result, setResult] = useState("");
  const [password, setPassword] = useState("");

  const phone = "972549909901"; // WhatsApp format (Israel)

  function resolveGender(g: Gender): "male" | "female" {
    if (g === "male") return "male";
    if (g === "female") return "female";
    return Math.random() > 0.5 ? "male" : "female";
  }

  async function generate() {
    const finalGender = resolveGender(gender);

    let { data } = await supabase
      .from("whatsapp_templates")
      .select("*")
      .eq("gender", finalGender)
      .eq("used", false);

    if (!data || data.length === 0) {
      await supabase.from("whatsapp_templates").update({ used: false });

      const res = await supabase
        .from("whatsapp_templates")
        .select("*")
        .eq("gender", finalGender)
        .eq("used", false);

      data = res.data;
    }

    if (!data || data.length === 0) return;

    const pick = data[Math.floor(Math.random() * data.length)];

    await supabase
      .from("whatsapp_templates")
      .update({ used: true })
      .eq("id", pick.id);

    let text = pick.text
      .replace(/\{?name\}?/gi, name || "")
      .replace(/\{?city\}?/gi, city || "");

    setResult(text);
  }

  function sendWhatsApp() {
    if (!result) return;

    const encoded = encodeURIComponent(result);

    window.open(
      `https://wa.me/${phone}?text=${encoded}`,
      "_blank"
    );
  }

  function loginAdmin() {
    if (password === "99004488") {
      window.location.href = "/lapidwhatsapp/admin";
    } else {
      alert("סיסמה שגויה");
    }
  }

  return (
    <div dir="rtl" style={{ padding: 30 }}>

      <h1>מחולל הודעות WhatsApp ליאיר לפיד</h1>

      <p style={{ maxWidth: 900, lineHeight: 1.6 }}>
        כאן ניתן ליצור הודעות WhatsApp בנושאי בעלי חיים ולשלוח ישירות.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 320 }}>
        <input placeholder="שם" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="עיר" value={city} onChange={(e) => setCity(e.target.value)} />

        <select value={gender} onChange={(e) => setGender(e.target.value as Gender)}>
          <option value="male">זכר</option>
          <option value="female">נקבה</option>
          <option value="other">אחר</option>
        </select>

        <button onClick={generate}>צור הודעה</button>
      </div>

      {result && (
        <div style={{ marginTop: 20, whiteSpace: "pre-wrap" }}>
          {result}

          <br /><br />

          <button onClick={sendWhatsApp}>
            פתח ב-WhatsApp
          </button>
        </div>
      )}

      <div style={{ position: "fixed", bottom: 10, right: 10 }}>
        <input
          placeholder="סיסמה"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={loginAdmin}>אדמין</button>
      </div>
    </div>
  );
}