export type HeightResult = {
  id: string
  name: string
  photoUri: string | null
  heightCm: number
  accuracy: "High" | "Moderate" | "Low"
  date: string              // ISO string, format at render time
  explanation: string      // used on Result page "Read more"
}

export const heightData: HeightResult[] = [
  {
    id: "1",
    name: "Name",
    photoUri: null,
    heightCm: 180,
    accuracy: "High" as const,
    date: new Date(Date.now() - 0).toISOString(),
    explanation: "Based on visual analysis of body proportions and reference objects in the image, our AI model estimates this person's height with high confidence. The analysis considers factors such as head-to-body ratio, limb proportions, and environmental context clues to provide an accurate measurement.",
  },
  {
    id: "2",
    name: "Name",
    photoUri: null,
    heightCm: 165,
    accuracy: "High" as const,
    date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    explanation: "The measurement was calculated using advanced computer vision algorithms that analyze body proportions and spatial relationships within the image. Multiple reference points were used to ensure accuracy.",
  },
  {
    id: "3",
    name: "Name",
    photoUri: null,
    heightCm: 175,
    accuracy: "Low" as const,
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    explanation: "Due to image quality and angle limitations, this measurement has lower confidence. The analysis was based on available visual cues but may be less precise than optimal conditions would allow.",
  },
  {
    id: "4",
    name: "Name",
    photoUri: null,
    heightCm: 170,
    accuracy: "Moderate" as const,
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    explanation: "The height estimation uses machine learning models trained on thousands of human body measurements. While the image provided good reference points, some factors may affect the final accuracy.",
  },
  {
    id: "5",
    name: "Name",
    photoUri: null,
    heightCm: 185,
    accuracy: "Moderate" as const,
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    explanation: "Our AI analyzed the proportional relationships between different body segments and compared them against known anthropometric data to estimate height with reasonable confidence.",
  },
];