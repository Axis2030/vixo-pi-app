import { Router } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const router = Router();

router.get("/", async (req, res) => {
  const userId = (req as any).session?.userId;
  if (!userId) return res.status(401).json({ error: "Not auth" });
  const items = await prisma.notification.findMany({ where: { userId }, orderBy: { createdAt: "desc" } });
  res.json(items);
});

// mark read
router.post("/:id/read", async (req, res) => {
  const id = req.params.id;
  const n = await prisma.notification.update({ where: { id }, data: { isRead: true } });
  res.json(n);
});

export default router;