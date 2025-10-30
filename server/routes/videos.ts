import { Router } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const router = Router();

// GET list
router.get("/", async (req, res) => {
  const videos = await prisma.video.findMany({ orderBy: { createdAt: "desc" }, take: 50 });
  res.json(videos);
});

// POST /api/videos (إنشاء)
router.post("/", async (req, res) => {
  const { title, description, url, thumbnail, uploaderId, isShort } = req.body;
  const v = await prisma.video.create({
    data: { title, description, url, thumbnail, uploaderId, isShort: !!isShort },
  });
  res.json(v);
});

// POST /api/videos/:id/comment
router.post("/:id/comment", async (req, res) => {
  const videoId = req.params.id;
  const { userId, content } = req.body;
  const c = await prisma.comment.create({ data: { videoId, userId, content } });
  res.json(c);
});

export default router;