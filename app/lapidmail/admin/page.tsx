"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Admin() {
  const [templates, setTemplates] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);

  const [bulkTemplates, setBulkTemplates] = useState("");
  const [bulkSubjects, setBulkSubjects] = useState("");

  const [editTemplateId, setEditTemplateId] = useState<number | null>(null);
  const [editTemplateText, setEditTemplateText] = useState("");

  const [editSubjectId, setEditSubjectId] = useState<number | null>(null);
  const [editSubjectText, setEditSubjectText] = useState("");

  async function load() {
    const t = await supabase.from("templates").select("*").order("id");
    const s = await supabase.from("subjects").select("*").order("id");

    setTemplates(t.data || []);
    setSubjects(s.data || []);
  }

  useEffect(() => {
    load();
  }, []);

  // 🧠 NORMALIZER (חשוב מאוד לבעיות שלך)
  const normalize = (s: string) =>
    s
      .replace(/\u00A0/g, " ") // NBSP fix
      .replace(/\r/g, "")
      .trim();

  const parseTemplate = (raw: string) => {
    let text = normalize(raw);

    // 🟢 remove leading numbers (robust)
    text = text.replace(/^\s*\d+\s*[\.:)]?\s*/g, "");

    let gender: "male" | "female" = "male";

    // 🟢 gender tag only (NOT part of content)
    if (/^\s*גבר\s*:/i.test(text)) {
      gender = "male";
      text = text.replace(/^\s*גבר\s*:\s*/i, "");
    } else if (/^\s*אישה\s*:/i.test(text)) {
      gender = "female";
      text = text.replace(/^\s*אישה\s*:\s*/i, "");
    }

    return { text, gender };
  };

  // ───── BULK TEMPLATES ─────
  async function bulkAddTemplates() {
    const items = bulkTemplates
      .split("###")
      .map(s => s.trim())
      .filter(Boolean);

    const rows = items.map(raw => {
      const { text, gender } = parseTemplate(raw);

      return {
        text,
        gender,
        used: false
      };
    });

    await supabase.from("templates").insert(rows);
    setBulkTemplates("");
    load();
  }

  // ───── BULK SUBJECTS ─────
  async function bulkAddSubjects() {
    const items = bulkSubjects
      .split("\n")
      .map(s => s.trim())
      .filter(Boolean)
      .map(s =>
        s
          .replace(/\u00A0/g, " ")
          .replace(/^\s*\d+\s*[\.:)]?\s*/g, "")
      );

    await supabase.from("subjects").insert(
      items.map(text => ({
        text,
        used: false
      }))
    );

    setBulkSubjects("");
    load();
  }

  // ───── DELETE ALL ─────
  async function deleteAllTemplates() {
    const ok = confirm("למחוק את כל הניסוחים?");
    if (!ok) return;

    await supabase.from("templates").delete().neq("id", 0);
    load();
  }

  async function deleteAllSubjects() {
    const ok = confirm("למחוק את כל הנושאים?");
    if (!ok) return;

    await supabase.from("subjects").delete().neq("id", 0);
    load();
  }

  // ───── UI ─────
  return (
    <div dir="rtl" style={{ padding: 30 }}>

      <h1>אדמין</h1>

      <button onClick={() => (window.location.href = "/")}>
        חזרה לאתר
      </button>

      {/* ───── TEMPLATES ───── */}
      <h2>ניסוחים</h2>

      <textarea
        value={bulkTemplates}
        onChange={(e) => setBulkTemplates(e.target.value)}
        style={{ width: "100%", height: 120 }}
      />

      <button onClick={bulkAddTemplates}>
        הוסף ניסוחים בבולק
      </button>

      <button onClick={deleteAllTemplates} style={{ color: "red", marginLeft: 10 }}>
        מחק הכל ניסוחים
      </button>

      {templates.map(t => (
        <div key={t.id} style={{ marginTop: 10 }}>

          {editTemplateId === t.id ? (
            <>
              <input
                value={editTemplateText}
                onChange={(e) => setEditTemplateText(e.target.value)}
              />
              <button
                onClick={async () => {
                  await supabase
                    .from("templates")
                    .update({ text: editTemplateText })
                    .eq("id", t.id);

                  setEditTemplateId(null);
                  load();
                }}
              >
                שמור
              </button>
            </>
          ) : (
            <>
              <div style={{ whiteSpace: "pre-wrap" }}>{t.text}</div>

              <button onClick={() => {
                setEditTemplateId(t.id);
                setEditTemplateText(t.text);
              }}>
                ערוך
              </button>

              <button
                onClick={async () => {
                  await supabase.from("templates").delete().eq("id", t.id);
                  load();
                }}
              >
                מחק
              </button>
            </>
          )}
        </div>
      ))}

      {/* ───── SUBJECTS ───── */}
      <h2>נושאים</h2>

      <textarea
        value={bulkSubjects}
        onChange={(e) => setBulkSubjects(e.target.value)}
        style={{ width: "100%", height: 120 }}
      />

      <button onClick={bulkAddSubjects}>
        הוסף נושאים בבולק
      </button>

      <button onClick={deleteAllSubjects} style={{ color: "red", marginLeft: 10 }}>
        מחק הכל נושאים
      </button>

      {subjects.map(s => (
        <div key={s.id} style={{ marginTop: 10 }}>

          {editSubjectId === s.id ? (
            <>
              <input
                value={editSubjectText}
                onChange={(e) => setEditSubjectText(e.target.value)}
              />
              <button
                onClick={async () => {
                  await supabase
                    .from("subjects")
                    .update({ text: editSubjectText })
                    .eq("id", s.id);

                  setEditSubjectId(null);
                  load();
                }}
              >
                שמור
              </button>
            </>
          ) : (
            <>
              <div>{s.text}</div>

              <button onClick={() => {
                setEditSubjectId(s.id);
                setEditSubjectText(s.text);
              }}>
                ערוך
              </button>

              <button
                onClick={async () => {
                  await supabase.from("subjects").delete().eq("id", s.id);
                  load();
                }}
              >
                מחק
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}