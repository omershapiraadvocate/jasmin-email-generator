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
      await supabase
        .from("templates")
        .update({ used: false })
        .eq("gender", finalGender);

      const res = await supabase
        .from("templates")
        .select("*")
        .eq("gender", finalGender)
        .eq("used", false);

      data = res.data;
    }

    if (!data || data.length === 0) return;

    const pick = data[Math.floor(Math.random() * data.length)];

    await supabase
      .from("templates")
      .update({ used: true })
      .eq("id", pick.id);

    const safeName = name || "";
    const safeCity = city || "";

    let text = pick.text;

    // 🔥 תיקון מלא לכל וריאציות
    text = text
      .split("{name}").join(safeName)
      .split("name").join(safeName)
      .split("{city}").join(safeCity)
      .split("city").join(safeCity);

    setResult(text);
  }

  function loginAdmin() {
    if (password === "99004488") {
      window.location.href = "/admin";
    } else {
      alert("סיסמה שגויה");
    }
  }

  function sendEmail() {
    const subject = encodeURIComponent("פנייה בנושא בעלי חיים בישראל");
    const body = encodeURIComponent(result || "");

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  }

  return (
    <div
      dir="rtl"
      style={{
        minHeight: "100vh",
        padding: 30,
        background: "linear-gradient(135deg, #0b2a18, #1c6b3a)",
        color: "white",
        fontFamily: "Arial",
        textAlign: "right",
      }}
    >
      <h1 style={{ fontSize: 30 }}>
        קול 2026 לבעלי החיים - מחולל מיילים ליאיר לפיד
      </h1>

      <p style={{ maxWidth: 850, marginBottom: 25, lineHeight: 1.6 }}>
        יסמין סאקס פרידמן היא חברת כנסת מיש עתיד, והיא דמות מרכזית הפועלת למען בעלי חיים בכנסת ובחקיקה.
        על מנת להבטיח את מקומה בכנסת הבאה, אנחנו צריכיםות להפעיל לחץ ציבורי על יאיר לפיד ולדרוש ממנו לשים
        את יסמין פרידמן במקום ראלי וגבוה ברשימת הח״כים של המפלגה שלו.
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
        <div
          style={{
            marginTop: 30,
            padding: 18,
            background: "rgba(255,255,255,0.12)",
            borderRadius: 12,
            whiteSpace: "pre-wrap",
          }}
        >
          {result}

          <div style={{ marginTop: 15 }}>
            <button onClick={sendEmail}>
              שלח מייל ליאיר לפיד
            </button>

            <div style={{ fontSize: 12, opacity: 0.85, marginTop: 6 }}>
              אם הכפתור לא פותח מייל, שלחו ידנית ל {email}
            </div>
          </div>
        </div>
      )}

      <div
        style={{
          position: "fixed",
          bottom: 15,
          right: 15,
          background: "rgba(0,0,0,0.25)",
          padding: 10,
          borderRadius: 10,
        }}
      >
        <input
          placeholder="סיסמה"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: 130 }}
        />
        <button onClick={loginAdmin}>כניסת אדמין</button>
      </div>
    </div>
  );
}