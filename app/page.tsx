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
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        
        {/* כותרת */}
        <h1 style={{ fontSize: 42, marginBottom: 10 }}>
          קול 2026 לבעלי החיים - כלים שימושיים ליצירת לחץ ציבורי
        </h1>

        {/* תת כותרת */}
        <p style={{ fontSize: 18, lineHeight: 1.8, marginBottom: 40 }}>
          בעלי החיים מוזנחים גם בכנסת וגם בקרב אנשי ציבור. לנו בתור ציבור שאוהב בעלי חיים ושאכפת לו מהם, יש אחריות להפעיל לחץ על נבחרי הציבור שלנו להעלות את רווחתם ואת מעמדם של בעלי החיים לסדר היום. באתר הזה עומדים לרשותכם.ן כלים שימושיים להפעלת לחץ על אנשי ציבור לקראת הבחירות שיכולים לגרום להם להטיב עם בעלי החיים. הכלים נבנו בצורה כזו שתהיה לכם.ן הכי נוחה שאפשר, כאשר ניסוחים מעולים ומגוונים לשליחת הודעות מוצעים לכם.ן בלחיצת כפתור אחת, ושליחת ההודעה עצמה בפלטפורמה הרלוונטית נעשית גם היא בלחיצת כפתור אחת נוספת (אל תשכחו לקרוא את ההודעה קודם ואז ללחוץ על שליחה. המייל/מספר הטלפון של איש הציבור באופן אוטומטי נכנס לכם לנמענים כך שלא תצטרכו להוסיף אותו ידנית).
          <br /><br />
          תודה רבה שאתם פה למען בעלי החיים, ושיהיה לנו המון הצלחה! למענם :)
        </p>

        {/* כותרת קמפיינים */}
        <h2 style={{ marginBottom: 20 }}>
          בחרו כאן איך לעזור לבעלי החיים בכנסת:
        </h2>

        {/* קמפיינים */}
        <div
          style={{
            display: "grid",
            gap: 24,
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          }}
        >

          {/* מיילים */}
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

            <button
              onClick={() => (window.location.href = "/lapidmail")}
              style={{
                marginTop: 15,
                padding: "18px 20px",
                fontSize: 14,
                cursor: "pointer",
                width: "100%",
                lineHeight: 1.5,
              }}
            >
              לחצו כאן כדי לשלוח מייל ליאיר לפיד שדורש ממנו לשים את ח״כ יסמין פרידמן הפועלת למען בעלי החיים במקום גבוה ברשימה של מפלגת יש עתיד וכך להבטיח את מקומה בכנסת הבאה
            </button>
          </div>

          {/* וואטסאפ */}
          <div
            style={{
              background: "rgba(255,255,255,0.12)",
              borderRadius: 18,
              padding: 24,
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            <h3 style={{ marginTop: 0 }}>
              מחולל הודעות WhatsApp ליאיר לפיד
            </h3>

            <button
              onClick={() => (window.location.href = "/lapidwhatsapp")}
              style={{
                marginTop: 15,
                padding: "18px 20px",
                fontSize: 14,
                cursor: "pointer",
                width: "100%",
                lineHeight: 1.5,
              }}
            >
              לחצו כאן כדי לשלוח הודעת וואטסאפ ליאיר לפיד שדורשת ממנו לשים את ח״כ יסמין פרידמן הפועלת למען בעלי החיים במקום גבוה ברשימה של מפלגת יש עתיד וכך להבטיח את מקומה בכנסת הבאה
            </button>
          </div>

          {/* כלים נוספים */}
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
              כלים נוספים
            </h3>

            <p>בהמשך יתווספו כלים נוספים.</p>
          </div>

        </div>
      </div>
    </div>
  );
}