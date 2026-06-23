"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Template = {
  id: number;
  text: string;
  gender: string;
  used: boolean;
};

export default function AdminPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [text, setText] = useState("");
  const [gender, setGender] = useState("male");
  const [editingId, setEditingId] = useState<number | null>(null);

  async function load() {
    const { data } = await supabase.from("templates").select("*").order("id");
    setTemplates(data || []);
  }

  useEffect(() => {
    load();
  }, []);

  async function addTemplate() {
    if (!text) return;

    await supabase.from("templates").insert({
      text,
      gender,
      used: false,
    });

    setText("");
    load();
  }

  async function deleteTemplate(id: number) {
    await supabase.from("templates").delete().eq("id", id);
    load();
  }

  async function startEdit(t: Template) {
    setEditingId(t.id);
    setText(t.text);
    setGender(t.gender);
  }

  async function saveEdit() {
    if (!editingId) return;

    await supabase
      .from("templates")
      .update({
        text,
        gender,
      })
      .eq("id", editingId);

    setEditingId(null);
    setText("");
    load();
  }

  function logout() {
    window.location.href = "/";
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: 30,
        background: "#0f2e1c",
        color: "white",
        fontFamily: "Arial",
      }}
    >
      <h1>פאנל אדמין</h1>

      <button onClick={logout} style={{ marginBottom: 20 }}>
        חזרה לאתר
      </button>

      {/* הוספה / עריכה */}
      <div style={{ marginBottom: 20 }}>
        <textarea
          placeholder="ניסוח..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ width: "100%", height: 100 }}
        />

        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="male">גבר</option>
          <option value="female">אישה</option>
        </select>

        {editingId ? (
          <button onClick={saveEdit}>שמור שינוי</button>
        ) : (
          <button onClick={addTemplate}>הוסף ניסוח</button>
        )}
      </div>

      {/* רשימה */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {templates.map((t) => (
          <div
            key={t.id}
            style={{
              padding: 10,
              background: "rgba(255,255,255,0.1)",
              borderRadius: 8,
            }}
          >
            <div>{t.text}</div>

            <small>
              {t.gender} | {t.used ? "בשימוש" : "פנוי"}
            </small>

            <div style={{ marginTop: 5 }}>
              <button onClick={() => startEdit(t)}>ערוך</button>
              <button onClick={() => deleteTemplate(t.id)} style={{ marginLeft: 10 }}>
                מחק
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}