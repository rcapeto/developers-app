import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const me = await prisma.developers.create({
    data: {
      name: 'Raphael Capeto',
      avatar_url: '',
      github: 'rcapeto',
      password: '@teste@123',
      points: 0,
      techs: 'React, React Native, Typescript, Prisma',
      username: 'rcapeto',
    },
  });

  //create 20 users [test]
  let user_Id = '';

  for (let i = 1; i <= 20; i++) {
    const user = await prisma.developers.create({
      data: {
        username: `user-t$-{i}`,
        name: `User test [${i}]`,
        avatar_url: '',
        github: `gh-test-${i}`,
        password: `@user-${i}-senha`,
        points: 0,
        techs: '',
      },
    });

    if (i === 10) {
      user_Id = user.id;
    }
  }

  //create 20 publications [test]

  let publication_Id_1 = '';

  for (let i = 1; i <= 20; i++) {
    const description =
      'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type';
    const image =
      'https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80';
    const title = `How techs are today into facebook, instagram and netflix - ${i}`;

    const publication = await prisma.publications.create({
      data: {
        description,
        developerId: user_Id,
        thumbnail: image,
        title,
      },
    });

    if (i === 1) {
      publication_Id_1 = publication.id;
    }
  }

  await prisma.likes.create({
    data: {
      developerId: me.id,
      publicationId: publication_Id_1,
    },
  });

  await prisma.likes.create({
    data: {
      developerId: user_Id,
      publicationId: publication_Id_1,
    },
  });
}

main();
