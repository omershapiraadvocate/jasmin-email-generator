"use client";

export default function Home() {
  return (
    <div
      dir="rtl"
      style={{
        minHeight: "100vh",
        padding: "40px 20px",
        background: "linear-gradient(135deg,#0b2a18,#1c6b3a)",
        color: "white",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 1000,
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            fontSize: 42,
            marginBottom: 10,
          }}
        >
          קול 2026 לבעלי החיים
        </h1>

        <p
          style={{
            fontSize: 20,
            lineHeight: 1.7,
            maxWidth: 900,
            marginBottom: 40,
          }}
        >
          ברוכים הבאים למרכז הקמפיינים של קול 2026 לבעלי החיים.
          <br />
          כאן תוכלו להשתתף בקמפיינים ציבוריים שונים למען בעלי החיים באמצעות
          מיילים, הודעות, וכלים נוספים שיתווספו בהמשך.
        </p>

        <h2 style={{ marginBottom: 20 }}>הקמפיינים הזמינים</h2>

        <div
          style={{
            display: "grid",
            gap: 24,
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.12)",
              borderRadius: 18,
              padding: 24,
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            <h3 style={{ marginTop: 0 }}>
              מחולל מיילים ליאיר לפיד
            </h3>

            <p style={{ lineHeight: 1.7 }}>
              יצירת מייל אישי בנושא קידום זכויות בעלי חיים ותמיכה במיקום גבוה
              ליסמין סאקס פרידמן ברשימת יש עתיד.
            </p>

            <button
              onClick={() => (window.location.href = "/lapidmail")}
              style={{
                marginTop: 10,
                padding: "12px 22px",
                fontSize: 16,
                cursor: "pointer",
              }}
            >
              כניסה למחולל
            </button>
          </div>

          <div
            style={{
              background: "rgba(255,255,255,0.08)",
              borderRadius: 18,
              padding: 24,
              opacity: 0.7,
              border: "1px dashed rgba(255,255,255,0.25)",
            }}
          >
            <h3 style={{ marginTop: 0 }}>
              מחולל הודעות WhatsApp
            </h3>

            <p>
              בקרוב...
            </p>
          </div>

          <div
            style={{
              background: "rgba(255,255,255,0.08)",
              borderRadius: 18,
              padding: 24,
              opacity: 0.7,
              border: "1px dashed rgba(255,255,255,0.25)",
            }}
          >
            <h3 style={{ marginTop: 0 }}>
              קמפיינים נוספים
            </h3>

            <p>
              יתווספו בהמשך.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}