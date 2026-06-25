"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Template = {
  id: number;
  text: string;
  gender: string;
  used: boolean;
};

export default function WhatsAppAdmin() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [text, setText] = useState("");
  const [gender, setGender] = useState("male");
  const [bulk, setBulk] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const load = async () => {
    const { data } = await supabase
      .from("whatsapp_templates")
      .select("*")
      .order("id", { ascending: true });

    if (data) setTemplates(data);
  };

  useEffect(() => {
    if (loggedIn) load();
  }, [loggedIn]);

  async function addTemplate() {
    if (!text.trim()) return;

    await supabase.from("whatsapp_templates").insert([
      {
        text,
        gender,
        used: false,
      },
    ]);

    setText("");
    load();
  }

  async function deleteTemplate(id: number) {
    await supabase.from("whatsapp_templates").delete().eq("id", id);
    load();
  }

  async function resetUsed() {
    await supabase.from("whatsapp_templates").update({ used: false });
    load();
  }

  async function clearAll() {
    await supabase.from("whatsapp_templates").delete().neq("id", 0);
    load();
  }

  function parseBulk() {
  const items = bulk
    .split("###")
    .map((t) => t.trim())
    .filter(Boolean);

  const parsed = items.map((t) => {
    const cleaned = t
      .replace(/^\d+[\.\:\)]\s*/g, "")
      .replace(/^גבר:\s*/g, "")
      .replace(/^אישה:\s*/g, "")
      .trim();

    let detectedGender: "male" | "female" = "male";

    if (/אישה\s*:/.test(t)) detectedGender = "female";
    if (/גבר\s*:/.test(t)) detectedGender = "male";

    return {
      text: cleaned,
      gender: detectedGender,
      used: false,
    };
  });

  supabase.from("whatsapp_templates").insert(parsed).then(() => {
    setBulk("");
    load();
  });
}
      };
    });

    supabase.from("whatsapp_templates").insert(parsed).then(() => {
      setBulk("");
      load();
    });
  }

  function login() {
    if (password === "99004488") {
      setLoggedIn(true);
      load();
    } else {
      alert("סיסמה שגויה");
    }
  }

  if (!loggedIn) {
    return (
      <div style={{ padding: 30 }}>
        <h2>אדמין וואטסאפ</h2>

        <input
          placeholder="סיסמה"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={login}>כניסה</button>

        <br /><br />

        <button onClick={() => (window.location.href = "/")}>
          חזרה לאתר הראשי
        </button>
      </div>
    );
  }

  return (
    <div dir="rtl" style={{ padding: 30, fontFamily: "Arial" }}>

      <div style={{ marginBottom: 20 }}>
        <button onClick={() => (window.location.href = "/")}>
          ⬅ חזרה לאתר הראשי
        </button>
      </div>

      <h1>אדמין וואטסאפ - לפיד</h1>

      <h2>הוספת ניסוח</h2>

      <textarea
        placeholder="טקסט"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
        style={{ width: "100%" }}
      />

      <select value={gender} onChange={(e) => setGender(e.target.value)}>
        <option value="male">גבר</option>
        <option value="female">אישה</option>
      </select>

      <button onClick={addTemplate}>הוסף</button>

      <hr />

      <h2>בולק (###)</h2>

      <textarea
        placeholder="הדבק כאן ניסוחים עם ###"
        value={bulk}
        onChange={(e) => setBulk(e.target.value)}
        rows={6}
        style={{ width: "100%" }}
      />

      <button onClick={parseBulk}>העלה בולק</button>

      <hr />

      <button onClick={resetUsed}>איפוס שימושים</button>
      <button onClick={clearAll} style={{ marginRight: 10 }}>
        מחיקת הכל
      </button>

      <hr />

      <h2>רשימת ניסוחים</h2>

      {templates.length === 0 && <p>אין ניסוחים עדיין</p>}

      {templates.map((t) => (
        <div
          key={t.id}
          style={{
            marginBottom: 10,
            padding: 10,
            border: "1px solid #ccc",
          }}
        >
          <b>{t.gender}</b>: {t.text}

          <div>
            <button onClick={() => deleteTemplate(t.id)}>
              מחק
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}