import { Router } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const router = Router();

router.post("/", async (req, res) => {
  const { title, description, ownerId, fundingGoal } = req.body;
  const p = await prisma.project.create({ data: { title, description, ownerId, fundingGoal: Number(fundingGoal) } });
  res.json(p);
});

router.get("/", async (req, res) => {
  const list = await prisma.project.findMany({ orderBy: { createdAt: "desc" } });
  res.json(list);
});

export default router;