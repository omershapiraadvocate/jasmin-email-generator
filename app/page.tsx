"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

type Gender = "male" | "female" | "other";

export default function Home() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [gender, setGender] = useState<Gender>("male");
  const [result, setResult] = useState("");
  const [password, setPassword] = useState("");

  const email = "yairlapid@knesset.gov.il";

  function resolveGender(g: Gender): "male" | "female" {
    if (g === "male") return "male";
    if (g === "female") return "female";
    return Math.random() > 0.5 ? "male" : "female";
  }

  async function generate() {
    const finalGender = resolveGender(gender);

    let { data } = await supabase
      .from("templates")
      .select("*")
      .eq("gender", finalGender)
      .eq("used", false);

    if (!data || data.length === 0) {
      await supabase.from("templates").update({ used: false });
      const res = await supabase
        .from("templates")
        .select("*")
        .eq("gender", finalGender)
        .eq("used", false);

      data = res.data;
    }

    if (!data || data.length === 0) return;

    const pick = data[Math.floor(Math.random() * data.length)];

    await supabase.from("templates").update({ used: true }).eq("id", pick.id);

    let text = pick.text
      .split("{name}").join(name || "")
      .split("name").join(name || "")
      .split("{city}").join(city || "")
      .split("city").join(city || "");

    setResult(text);
  }

  async function sendEmail() {
    let { data: subjects } = await supabase
      .from("subjects")
      .select("*")
      .eq("used", false);

    if (!subjects || subjects.length === 0) {
      await supabase.from("subjects").update({ used: false });

      const res = await supabase
        .from("subjects")
        .select("*")
        .eq("used", false);

      subjects = res.data;
    }

    if (!subjects || subjects.length === 0) return;

    const pick = subjects[Math.floor(Math.random() * subjects.length)];

    await supabase.from("subjects").update({ used: true }).eq("id", pick.id);

    const subject = encodeURIComponent(pick.text);
    const body = encodeURIComponent(result || "");

    window.location.href =
      `mailto:${email}?subject=${subject}&body=${body}`;
  }

  function loginAdmin() {
    if (password === "99004488") {
      window.location.href = "/admin";
    } else {
      alert("סיסמה שגויה");
    }
  }

  return (
    <div
      dir="rtl"
      style={{
        minHeight: "100vh",
        padding: 30,
        background: "linear-gradient(135deg,#0b2a18,#1c6b3a)",
        color: "white",
        fontFamily: "Arial",
        textAlign: "right",
      }}
    >
      <h1>
        קול 2026 לבעלי החיים - מחולל מיילים ליאיר לפיד
      </h1>

      <p style={{ maxWidth: 900, lineHeight: 1.6 }}>
        יסמין סאקס פרידמן היא חברת כנסת מיש עתיד, והיא דמות מרכזית הפועלת למען בעלי חיים בכנסת ובחקיקה. על מנת להבטיח את מקומה בכנסת הבאה, אנחנו צריכיםות להפעיל לחץ ציבורי על יאיר לפיד ולדרוש ממנו לשים את יסמין פרידמן במקום ראלי וגבוה ברשימת הח״כים של המפלגה שלו. באתר זה תוכלו לקבל נוסח למייל שתוכלו לשלוח ישירות ליאיר לפיד דרך הכפתור ״שלח מייל״. תודה ובהצלחה! :)
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 320 }}>
        <input placeholder="שם" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="עיר" value={city} onChange={(e) => setCity(e.target.value)} />

        <select value={gender} onChange={(e) => setGender(e.target.value as Gender)}>
          <option value="male">זכר</option>
          <option value="female">נקבה</option>
          <option value="other">אחר</option>
        </select>

        <button onClick={generate}>צור טקסט</button>
      </div>

      {result && (
        <div style={{ marginTop: 20, padding: 15, background: "rgba(255,255,255,0.1)" }}>
          {result}

          <div>
            <button onClick={sendEmail}>שלח מייל</button>
          </div>
        </div>
      )}

      <div style={{ position: "fixed", bottom: 15, right: 15 }}>
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