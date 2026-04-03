import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Copy, Check, Trash2, Link as LinkIcon } from "lucide-react";
import Footer from "../components/Footer";

const initialData = [
  { originalURL: "https://www.google.com/search?q=reactasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasd", shortCode: "abcdefghij", clicks: 24, expiresAt: "2026-03-27T10:00:00Z" },
  { originalURL: "https://github.com", shortCode: "klmnopqrst", clicks: 102, expiresAt: "2026-06-15T12:30:00Z" },
  { originalURL: "https://amazon.in", shortCode: "uvwxyz0123", clicks: 8, expiresAt: "2026-09-01T09:15:00Z" },
  { originalURL: "https://stackoverflow.com", shortCode: "pqrstuvwxy", clicks: 57, expiresAt: "2026-07-20T08:00:00Z" },
  { originalURL: "https://figma.com", shortCode: "zyxwvutsrq", clicks: 34, expiresAt: "2026-05-10T14:00:00Z" },
  { originalURL: "https://tailwindcss.com", shortCode: "mnbvcxzlkj", clicks: 19, expiresAt: "2026-03-20T11:00:00Z" },
  { originalURL: "https://npmjs.com", shortCode: "hgfdsapoiu", clicks: 76, expiresAt: "2026-08-05T09:00:00Z" },
  { originalURL: "https://vercel.com", shortCode: "ytrewqlkjh", clicks: 45, expiresAt: "2026-10-01T00:00:00Z" },
];

const PAGE_SIZE = 10;

/* ---------- COMMON ---------- */

const btnStyle = {
  padding: "6px",
  borderRadius: "6px",
  border: "1px solid #ddd",
  background: "#fff",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const Badge = ({ active }) => (
  <span style={{
    fontSize: "11px",
    padding: "4px 10px",
    borderRadius: "20px",
    background: active ? "#f0fdf4" : "#fef2f2",
    color: active ? "#16a34a" : "#dc2626",
    fontWeight: "500"
  }}>
    {active ? "Active" : "Expired"}
  </span>
);

/* ---------- MOBILE ---------- */

const MobileCard = ({ item, onCopy, onDelete, isCopied }) => {
  const active = new Date(item.expiresAt) >= new Date();

  return (
    <div style={{
      border: "1px solid #eee",
      borderRadius: "12px",
      padding: "16px",
      display: "flex",
      flexDirection: "column",
      gap: "14px"
    }}>
      <div>
        <div style={{ fontSize: "12px", color: "#999" }}>Destination</div>

        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <LinkIcon size={14} />

          <div
            className="hide-scroll"
            style={{
              overflowX: "auto",
              whiteSpace: "nowrap",
              flex: 1
            }}
          >
            <a href={item.originalURL} target="_blank" rel="noreferrer">
              {item.originalURL}
            </a>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span>hlserver.vercel.app/{item.shortCode}</span>

        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => onCopy(item.shortCode)} style={btnStyle}>
            {isCopied ? <Check size={16} /> : <Copy size={16} />}
          </button>

          <button onClick={() => onDelete(item._id)} style={{ ...btnStyle, color: "red" }}>
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>{item.clicks} clicks</span>
        <Badge active={active} />
      </div>
    </div>
  );
};

/* ---------- MAIN ---------- */

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [copied, setCopied] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(data.length / PAGE_SIZE);
  const pageData = data.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_HOSTSERVER}/api/fetch`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: "sujalsaini3304@gmail.com", // replace dynamically later
          }),
        });

        const result = await res.json();

        if (result.success) {
          setData(result.data);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchData();
  }, []);



  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // const handleCopy = (code) => {
  //   navigator.clipboard.writeText(`https://hlserver.vercel.app/${code}`);
  //   setCopied(code);
  //   setTimeout(() => setCopied(null), 1500);
  // };

  
  const handleCopy = async (code) => {
    const text = `https://hlserver.vercel.app/${code}`;

    try {
      // Modern API
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for mobile
        const textArea = document.createElement("textarea");
        textArea.value = text;

        // Avoid scrolling to bottom
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        document.execCommand("copy");
        textArea.remove();
      }

      setCopied(code);
      setTimeout(() => setCopied(null), 1500);

    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  // const handleDelete = (code) => {
  //   const updated = data.filter((item) => item.shortCode !== code);
  //   setData(updated);

  //   if ((page - 1) * PAGE_SIZE >= updated.length) {
  //     setPage((p) => Math.max(p - 1, 1));
  //   }
  // };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_HOSTSERVER}/api/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          email: "sujalsaini3304@gmail.com", // dynamic later
        }),
      });

      const result = await res.json();

      if (result.success) {
        // remove from UI
        const updated = data.filter((item) => item._id !== id);
        setData(updated);

        // fix pagination edge case
        if ((page - 1) * PAGE_SIZE >= updated.length) {
          setPage((p) => Math.max(p - 1, 1));
        }
      }

    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  if (data.length === 0) {
    return <div style={{ textAlign: "center", marginTop: "50px" }}>No URLs Found</div>;
  }

  return (

    <div className="max-w-350 mx-auto px-3">
      <style>{`
        .hide-scroll::-webkit-scrollbar { display: none; }
        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <Navbar />

      {isMobile ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {pageData.map((item) => (
            <MobileCard
              key={item.shortCode}
              item={item}
              onCopy={handleCopy}
              onDelete={handleDelete}
              isCopied={copied === item.shortCode}
            />
          ))}
        </div>
      ) : (
        <div style={{
          border: "1px solid #eee",
          borderRadius: "12px",
          overflow: "hidden"
        }}>
          {/* HEADER */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "2fr 1.5fr 1fr 1.2fr",
            padding: "14px 16px",
            fontSize: "12px",
            color: "#888",
            background: "#fafafa"
          }}>
            <span>Destination</span>
            <span>Short Link</span>
            <span>Clicks</span>
            <span>Actions</span>
          </div>

          {/* ROWS */}
          {pageData.map((item) => {
            const active = new Date(item.expiresAt) >= new Date();

            return (
              <div key={item._id} style={{
                display: "grid",
                gridTemplateColumns: "2fr 1.5fr 1fr 1.2fr",
                padding: "14px 16px",
                borderTop: "1px solid #f3f3f3",
                alignItems: "center"
              }}>
                {/* DESTINATION FIX */}
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis"
                    }}
                    title={item.originalURL}
                  >
                    {item.originalURL}
                  </div>
                </div>

                {/* SHORT LINK FIX */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0 }}>
                  <span style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                  }}>
                    hlserver.vercel.app/{item.shortCode}
                  </span>

                  <button onClick={() => handleCopy(item.shortCode)} style={btnStyle}>
                    {copied === item.shortCode ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>

                <div>{item.clicks}</div>

                <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                  <Badge active={active} />

                  <button onClick={() => handleDelete(item._id)} style={{ ...btnStyle, color: "red" }}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* PAGINATION */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "10px",
        marginTop: "18px",
        flexWrap: "wrap"
      }}>
        <button onClick={() => setPage(p => Math.max(p - 1, 1))}>Prev</button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            style={{ fontWeight: page === i + 1 ? "bold" : "normal" }}
          >
            {i + 1}
          </button>
        ))}

        <button onClick={() => setPage(p => Math.min(p + 1, totalPages))}>
          Next
        </button>
      </div>
      <Footer />
    </div>

  );
}