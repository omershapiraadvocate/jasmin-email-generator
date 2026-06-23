"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Template = {
  id: number;
  text: string;
  gender: string;
  used: boolean;
};

type Subject = {
  id: number;
  text: string;
  used: boolean;
};

export default function Admin() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const [newTemplate, setNewTemplate] = useState("");
  const [newSubject, setNewSubject] = useState("");

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

  // ───────── Templates ─────────

  async function addTemplate() {
    if (!newTemplate.trim()) return;

    const { data: existing } = await supabase
      .from("templates")
      .select("*")
      .eq("text", newTemplate.trim());

    if (existing && existing.length > 0) {
      alert("הניסוח כבר קיים");
      return;
    }

    await supabase.from("templates").insert({
      text: newTemplate.trim(),
      gender: "male",
      used: false,
    });

    setNewTemplate("");
    load();
  }

  async function deleteTemplate(id: number) {
    await supabase.from("templates").delete().eq("id", id);
    load();
  }

  function startEditTemplate(t: Template) {
    setEditTemplateId(t.id);
    setEditTemplateText(t.text);
  }

  async function saveTemplateEdit() {
    if (!editTemplateId) return;

    await supabase
      .from("templates")
      .update({ text: editTemplateText })
      .eq("id", editTemplateId);

    setEditTemplateId(null);
    setEditTemplateText("");
    load();
  }

  // ───────── Subjects ─────────

  async function addSubject() {
    if (!newSubject.trim()) return;

    const { data: existing } = await supabase
      .from("subjects")
      .select("*")
      .eq("text", newSubject.trim());

    if (existing && existing.length > 0) {
      alert("הנושא כבר קיים");
      return;
    }

    await supabase.from("subjects").insert({
      text: newSubject.trim(),
      used: false,
    });

    setNewSubject("");
    load();
  }

  async function deleteSubject(id: number) {
    await supabase.from("subjects").delete().eq("id", id);
    load();
  }

  function startEditSubject(s: Subject) {
    setEditSubjectId(s.id);
    setEditSubjectText(s.text);
  }

  async function saveSubjectEdit() {
    if (!editSubjectId) return;

    await supabase
      .from("subjects")
      .update({ text: editSubjectText })
      .eq("id", editSubjectId);

    setEditSubjectId(null);
    setEditSubjectText("");
    load();
  }

  function logout() {
    window.location.href = "/";
  }

  return (
    <div
      style={{
        padding: 30,
        background: "#0b2a18",
        color: "white",
        minHeight: "100vh",
        fontFamily: "Arial",
        textAlign: "right",
      }}
    >
      <h1>פאנל אדמין</h1>

      <button onClick={logout}>חזרה לאתר</button>

      {/* ───── Templates ───── */}
      <h2 style={{ marginTop: 20 }}>ניסוחים</h2>

      <input
        value={newTemplate}
        onChange={(e) => setNewTemplate(e.target.value)}
        placeholder="הוסף ניסוח חדש"
      />
      <button onClick={addTemplate}>הוסף</button>

      <div style={{ marginTop: 10 }}>
        {templates.map((t) => (
          <div
            key={t.id}
            style={{
              padding: 10,
              marginBottom: 8,
              background: "rgba(255,255,255,0.1)",
              borderRadius: 6,
            }}
          >
            {editTemplateId === t.id ? (
              <>
                <input
                  value={editTemplateText}
                  onChange={(e) => setEditTemplateText(e.target.value)}
                />
                <button onClick={saveTemplateEdit}>שמור</button>
              </>
            ) : (
              <>
                <div>{t.text}</div>
                <button onClick={() => startEditTemplate(t)}>ערוך</button>
                <button onClick={() => deleteTemplate(t.id)}>מחק</button>
              </>
            )}
          </div>
        ))}
      </div>

      {/* ───── Subjects ───── */}
      <h2 style={{ marginTop: 30 }}>נושאים</h2>

      <input
        value={newSubject}
        onChange={(e) => setNewSubject(e.target.value)}
        placeholder="הוסף נושא חדש"
      />
      <button onClick={addSubject}>הוסף</button>

      <div style={{ marginTop: 10 }}>
        {subjects.map((s) => (
          <div
            key={s.id}
            style={{
              padding: 10,
              marginBottom: 8,
              background: "rgba(255,255,255,0.1)",
              borderRadius: 6,
            }}
          >
            {editSubjectId === s.id ? (
              <>
                <input
                  value={editSubjectText}
                  onChange={(e) => setEditSubjectText(e.target.value)}
                />
                <button onClick={saveSubjectEdit}>שמור</button>
              </>
            ) : (
              <>
                <div>{s.text}</div>
                <button onClick={() => startEditSubject(s)}>ערוך</button>
                <button onClick={() => deleteSubject(s.id)}>מחק</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}