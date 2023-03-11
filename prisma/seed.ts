import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const TAGS = ["Album", "Drama", "Live Concert", "Movie"];

const content = `[{"type":"paragraph","children":[{"text":"   Selamat datang kembali di KinoKonoka Subs:)"}]},{"type":"paragraph","children":[{"text":""}]},{"type":"paragraph","children":[{"text":"Kali ini ada Hinatazaka de Aimashou Episode 176, Segmen khusus Higashimura!"}]},{"type":"paragraph","children":[{"text":""}]},{"type":"paragraph","children":[{"text":""}]},{"type":"image","url":"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjSzr2YyjnOQ0HiJCeya5CPMDuvBCVTJXlp725NJpMANMyEUv-oR1qXlv6eIT_-QLBx0fTYQTnX--Ks5RPxql-aWfuFBMEvI42K_S5N5usuSjYPGKXrHcotXdCNUstfU6DiWQciT2QYR5HPYKwVvnVxyp6H8cK8dgcs9CKU357DrCbZPsKQHe6LGl9NzA/s320/WhatsApp%20Image%202022-11-07%20at%208.55.22%20PM.jpeg","children":[{"text":"\n"}]},{"type":"paragraph","children":[{"text":""}]},{"type":"paragraph","children":[{"text":""}]},{"type":"paragraph","children":[{"text":"Di episode kali ini ada segment khusus untuk Higashimura Mei, mari kita saksikan keseruan para member mempromosikan keunikan Mei "}]},{"type":"paragraph","children":[{"text":""}]},{"type":"paragraph","children":[{"text":""}]},{"type":"paragraph","children":[{"text":"     TL : by MinPanda "}]},{"type":"paragraph","children":[{"text":"    (Min Kino masih hiatus dikarenakan perangkat untuk mengesub sedang rusak dan kesibukan lainnya)"}]}]`;

async function main() {
  const tagsData = TAGS.map((t) => ({
    name: t,
  }));

  await prisma.tag.createMany({ data: tagsData });

  const user = await prisma.user.upsert({
    create: {
      email: "yuan@gmail.com",
      name: "Snowsant",
      image:
        "https://static.wikia.nocookie.net/virtualyoutuber/images/0/09/Nakiri_Ayame_Portrait.png",
      emailVerified: null,
    },
    where: {
      email: "yuan@admin.com",
    },
    update: {},
  });

  const tags = await prisma.tag.findMany();

  const posts = tags.map((t) => ({
    content: content,
    thumbnail:
      "https://static.wikia.nocookie.net/virtualyoutuber/images/d/d0/Nakiri_Ayame_Fourth_Costume_Concept_Illustration_by_%E3%81%AA%E3%81%AA%E3%81%8B%E3%81%90%E3%82%89.jpg",
    title: `lorem ${t.name}`,
    user_id: user.id,
  }));

  posts.unshift({
    content: content,
    thumbnail:
      "https://static.wikia.nocookie.net/virtualyoutuber/images/d/d0/Nakiri_Ayame_Fourth_Costume_Concept_Illustration_by_%E3%81%AA%E3%81%AA%E3%81%8B%E3%81%90%E3%82%89.jpg",
    title: `lorem ${tags[0]?.name ?? ""}`,
    user_id: user.id,
  });

  await prisma.post.createMany({ data: posts });

  const postsDb = await prisma.post.findMany();

  const postTags = postsDb.map((p, i) => ({
    post_id: p.id,
    tag_id: tags[i]?.id ?? tags[0]?.id ?? "", // give it default id after generating tags
  }));

  await prisma.postsOnTags.createMany({ data: postTags });

  const links: {
    name: string;
    link: string;
    post_id: string;
  }[] = [];

  postsDb.forEach((p) => {
    return links.push({
      name: "Download",
      link: "https://youtu.be/GNkPJvVEm0s",
      post_id: p.id,
    });
  });

  postsDb.forEach((p) => {
    return links.push({
      name: "Download Part 2",
      link: "https://youtu.be/TSxs30c4YgY",
      post_id: p.id,
    });
  });

  await prisma.link.createMany({
    data: links,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
