import { createClient } from "@sanity/client";
import { config } from "dotenv";
import { resolve } from "path";

// Load .env.local file
config({ path: resolve(process.cwd(), ".env.local") });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

// Picsum Photos - reliable placeholder images
const images = [
  {
    url: "https://picsum.photos/seed/garden1/1200/800",
    filename: "private-garden-1.jpg",
  },
  {
    url: "https://picsum.photos/seed/garden2/1200/800",
    filename: "private-garden-2.jpg",
  },
  {
    url: "https://picsum.photos/seed/roof1/1200/800",
    filename: "roof-garden-1.jpg",
  },
  {
    url: "https://picsum.photos/seed/roof2/1200/800",
    filename: "roof-garden-2.jpg",
  },
  {
    url: "https://picsum.photos/seed/planning1/1200/800",
    filename: "planning-1.jpg",
  },
  {
    url: "https://picsum.photos/seed/planning2/1200/800",
    filename: "planning-2.jpg",
  },
];

const projects = [
  {
    title: "גינה פרטית ברמת השרון",
    category: "private",
    description: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "פרויקט עיצוב גינה פרטית מקסים בלב רמת השרון. הגינה משלבת אלמנטים טבעיים עם עיצוב מודרני, כולל פינות ישיבה נוחות, שבילי אבן טבעית ומערכת השקיה חכמה.",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "התכנון כלל בחירה קפדנית של צמחיה ים-תיכונית מקומית העמידה בפני בצורת, יצירת אזורי צל טבעיים ושילוב תאורה דקורטיבית ליצירת אווירה קסומה בשעות הערב.",
          },
        ],
      },
    ],
    order: 1,
  },
  {
    title: "חצר מעוצבת בהרצליה",
    category: "private",
    description: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "שדרוג מקיף של חצר פרטית בהרצליה, המשלב בין פונקציונליות למראה אסתטי מושלם. החצר כוללת אזור ברביקיו מקצועי, דשא סינטטי איכותי ופינת משחקים לילדים.",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "המיקוד היה על יצירת מרחב חיים נוח למשפחה, עם דגש על תחזוקה נמוכה ושימוש בצמחים רב-שנתיים העמידים בתנאי האקלים המקומיים.",
          },
        ],
      },
    ],
    order: 2,
  },
  {
    title: "גג ירוק במגדל משרדים",
    category: "roof",
    description: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "פרויקט חדשני ליצירת גג ירוק במגדל משרדים מודרני בתל אביב. הפרויקט כולל מערכות ניקוז מתקדמות, אדניות מוגבהות ובחירת צמחים עמידים לרוח ושמש.",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "הגג הירוק משמש כמרחב מנוחה לעובדי המשרד, תורם לבידוד תרמי של הבניין ומספק פתרון ברי-קיימא לניהול מי גשמים.",
          },
        ],
      },
    ],
    order: 3,
  },
  {
    title: "מרפסת גג בתל אביב",
    category: "roof",
    description: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "עיצוב מרפסת גג פרטית ברובע הצפוני של תל אביב. הפרויקט שילב צמחיה עשירה בעציצים, מערכת השקיה אוטומטית ופתרונות צל יצירתיים.",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "המרפסת הפכה למרחב חיים נוסף לדירה, עם פינת אוכל, ערסל ופרגולת עץ מעוצבת המספקת צל ואווירה נעימה.",
          },
        ],
      },
    ],
    order: 4,
  },
  {
    title: "תכנון נוף לפארק שכונתי",
    category: "planning",
    description: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "תכנון מקיף של פארק שכונתי ברעננה, הכולל שבילי הליכה, אזורי ישיבה מוצלים, מגרשי משחקים ומערכת תאורה אקולוגית.",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "התכנון התבסס על עקרונות בני-קיימא, תוך שימוש בצמחיה מקומית, שימור עצים קיימים ויצירת מערכת אקולוגית תומכת חי בר עירוני.",
          },
        ],
      },
    ],
    order: 5,
  },
  {
    title: "תכנון גינה קהילתית",
    category: "planning",
    description: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "פרויקט ייחודי ליצירת גינה קהילתית בשכונת נווה צדק. הגינה מאפשרת לתושבים לגדל ירקות ופירות, תוך יצירת מרחב חברתי משותף.",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "התכנון כלל חלוקה לחלקות, מערכת השקיה משותפת, אזור קומפוסט קהילתי ומבנה צל מרכזי לפעילויות חברתיות וסדנאות.",
          },
        ],
      },
    ],
    order: 6,
  },
];

async function uploadImage(url: string, filename: string) {
  console.log(`📥 Downloading ${filename}...`);
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();

  console.log(`⬆️  Uploading ${filename} to Sanity...`);
  const asset = await client.assets.upload("image", Buffer.from(buffer), {
    filename,
  });

  console.log(`✅ Uploaded: ${asset._id}`);
  return asset;
}

async function seed() {
  console.log("🌱 Starting Sanity seeding process...\n");

  if (!process.env.SANITY_API_WRITE_TOKEN) {
    throw new Error("SANITY_API_WRITE_TOKEN is not set in .env.local");
  }

  try {
    // Upload images
    console.log("📸 Uploading images...\n");
    const uploadedAssets = [];
    for (const image of images) {
      const asset = await uploadImage(image.url, image.filename);
      uploadedAssets.push(asset);
    }

    console.log("\n✨ Creating projects...\n");

    // Create projects
    for (let i = 0; i < projects.length; i++) {
      const project = projects[i];
      const asset = uploadedAssets[i];

      const slug = project.title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\u0590-\u05FF\w-]/g, "");

      const doc = {
        _id: `project-${i + 1}`,
        _type: "project",
        title: project.title,
        slug: {
          _type: "slug",
          current: slug,
        },
        category: project.category,
        mainImage: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: asset._id,
          },
          alt: project.title,
        },
        gallery: [
          {
            _type: "image",
            _key: `img-1`,
            asset: {
              _type: "reference",
              _ref: asset._id,
            },
            alt: `${project.title} - תמונה 1`,
          },
        ],
        description: project.description,
        order: project.order,
      };

      await client.createOrReplace(doc);
      console.log(`✅ Created: ${project.title}`);
    }

    console.log("\n🎉 Seeding completed successfully!");
    console.log("\n👉 Visit http://localhost:3000/studio to see your projects");
    console.log("👉 Visit http://localhost:3000 to see them on the website\n");
  } catch (error) {
    console.error("❌ Error during seeding:", error);
    process.exit(1);
  }
}

seed();
