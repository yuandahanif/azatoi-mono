import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const TAGS = ["Album", "Drama", "Live Concert", "Movie"];

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
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    thumbnail:
      "https://static.wikia.nocookie.net/virtualyoutuber/images/d/d0/Nakiri_Ayame_Fourth_Costume_Concept_Illustration_by_%E3%81%AA%E3%81%AA%E3%81%8B%E3%81%90%E3%82%89.jpg",
    title: `lorem ${t.name}`,
    user_id: user.id,
  }));

  posts.unshift({
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
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
