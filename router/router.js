const express = require("express");
const router = express.Router();

const { PrismaClient } = require("../generated/prisma-client");
const prisma = new PrismaClient();

// ✅ Thêm mới note
router.post("/new/note", async (req, res) => {
  try {
    const note = await prisma.note.create({
      data: {
        title: req.body.title,
        body: req.body.body,
      },
    });
    res.json(note);
  } catch (error) {
    console.error("Lỗi tạo note:", error);
    res.status(500).json({ error: "Tạo note thất bại" });
  }
});

// ✅ Lấy 1 note theo id
router.post("/get/note", async (req, res) => {
  try {
    const note = await prisma.note.findUnique({
      where: { id: req.body.id },
    });

    if (!note) return res.status(404).json({ error: "Không tìm thấy note" });

    res.json(note);
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi lấy note" });
  }
});

// ✅ Danh sách tất cả note
router.post("/list/note", async (req, res) => {
  try {
    const notes = await prisma.note.findMany({
      select: {
        id: true,
        title: true,
        body: false, // 🔥 Quan trọng
        createdAt: true,
      },
    });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: "Không thể lấy danh sách note" });
  }
});

// ✅ Cập nhật note theo id
router.post("/update/note", async (req, res) => {
  try {
    const note = await prisma.note.update({
      where: { id: req.body.id },
      data: {
        title: req.body.title,
        body: req.body.body,
      },
    });
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: "Không cập nhật được note" });
  }
});

// ✅ Xoá note theo id
router.post("/delete/note", async (req, res) => {
  try {
    const note = await prisma.note.delete({
      where: { id: req.body.id },
    });
    res.json({ message: "Đã xoá note", note });
  } catch (error) {
    res.status(500).json({ error: "Không xoá được note" });
  }
});


module.exports = router;
