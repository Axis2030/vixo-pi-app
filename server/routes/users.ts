import { Router } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const router = Router();

// GET /api/users/me
router.get("/me", async (req, res) => {
  // افتراض أنك تستخدم middleware للتحقق من الجلسة
  const userId = (req as any).session?.userId;
  if (!userId) return res.status(401).json({ error: "Not authenticated" });
  const user = await prisma.user.findUnique({ where: { id: userId } });
  res.json({ user });
});

// POST /api/auth/pi-auth  (يستقبل Pioneer accessToken)
router.post("/auth/pi-auth", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(400).json({ error: "Missing token" });
  const accessToken = authHeader.replace("Bearer ", "");
  // تحقق من توكن Pi عبر خدمة خارجية أو تخمين
  // هنا سنفترض payload بعد التحقق:
  const piPayload = { username: "pi-user", wallet_address: "0xabc" };
  // العثور أو إنشاء مستخدم
  const user = await prisma.user.upsert({
    where: { username: piPayload.username },
    update: { walletAddress: piPayload.wallet_address },
    create: {
      username: piPayload.username,
      walletAddress: piPayload.wallet_address,
    },
  });
  // اصدار JWT أو session
  // مثال: res.cookie("sid", "token");
  res.json({ user, membership_class: user.membershipClass });
});

export default router;