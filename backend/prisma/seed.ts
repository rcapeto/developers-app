import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  let userId = '';
  let articleId = '';

  for (let i = 1; i <= 20; i++) {
    const user = await prisma.users.create({
      data: {
        document: createDocument(),
        email: `seed${i}-user@gmail.com`,
        firstName: `User ${i + 1}`,
        github: `user${i}`,
        lastName: 'Teste',
        name: `User ${i + 1} Teste`,
        password: 'teste123456',
        avatar_url: 'https://github.com/rcapeto.png',
      },
    });

    if (i == 1) {
      userId = user.id;
    }
  }

  for (let i = 1; i <= 20; i++) {
    const article = await prisma.articles.create({
      data: {
        text: `In this post you can see how prisma works - ${i}`,
        title: `Title ${i}`,
        authorId: userId,
        likes: i * 2,
        imageUrl:
          'https://images.unsplash.com/photo-1611914974124-466c45d4c7a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1673&q=80',
      },
    });
    if (i == 1) {
      articleId = article.id;
    }
  }

  for (let i = 1; i <= 5; i++) {
    await prisma.comments.create({
      data: {
        likes: i * 5,
        text: 'I love this post!',
        authorId: userId,
        articleId: articleId,
      },
    });
  }
}

function createDocument() {
  const document: string[] = [];

  for (let i = 0; i <= 10; i++) {
    const randomNumber = Math.floor(Math.random() * 9);

    document.push(randomNumber.toString());
  }

  return document.join('');
}

main();
