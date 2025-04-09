
export interface Quote {
  text: string;
  source: string;
}

export interface GlossaryItem {
  term: string;
  definition: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const quotes: Quote[] = [
  {
    text: "Sapere aude! [Dare to know!] Have courage to use your own understanding!",
    source: "What is Enlightenment? (1784)"
  },
  {
    text: "Act only according to that maxim whereby you can, at the same time, will that it should become a universal law.",
    source: "Groundwork of the Metaphysics of Morals (1785)"
  },
  {
    text: "Science is organized knowledge. Wisdom is organized life.",
    source: "Critique of Pure Reason (1781)"
  },
  {
    text: "Two things fill the mind with ever new and increasing admiration and awe, the more often and steadily we reflect upon them: the starry heavens above me and the moral law within me.",
    source: "Critique of Practical Reason (1788)"
  },
  {
    text: "Live your life as though your every act were to become a universal law.",
    source: "Categorical Imperative"
  }
];

export const complexToSimple: Record<string, string> = {
  "categorical imperative": "A rule that says you should only act in a way that you'd want everyone else to act in the same situation.",
  "transcendental idealism": "The view that we can only know things as they appear to us, not as they are in themselves.",
  "synthetic a priori": "Knowledge that is both informative about the world and can be known without experience.",
  "noumenon": "A thing as it exists in itself, independent of our perception of it.",
  "phenomenon": "A thing as it appears to us through our senses and understanding.",
  "antinomy": "A contradiction between two beliefs or conclusions that seem equally logical or reasonable.",
  "pure reason": "The faculty of knowledge that provides the principles of knowledge independent of experience."
};

export const glossaryItems: GlossaryItem[] = [
  {
    term: "Categorical Imperative",
    definition: "The central philosophical concept in Kant's ethics. It is a way of evaluating motivations for action and states that an action is moral only if the principle behind it would be accepted universally."
  },
  {
    term: "Transcendental Idealism",
    definition: "Kant's doctrine that maintains that human experience of things consists of how they appear to us, not as they are in themselves. Space and time are forms of human intuition."
  },
  {
    term: "Synthetic A Priori",
    definition: "Judgments that are both informative about the world (synthetic) and can be known independently of experience (a priori). These judgments were central to Kant's critical philosophy."
  },
  {
    term: "Noumenon",
    definition: "A thing as it is in itself, independent of observation. According to Kant, we cannot know noumena, only phenomena."
  },
  {
    term: "Phenomenon",
    definition: "An object as it appears to an observer, as opposed to its true nature (noumenon)."
  },
  {
    term: "Autonomy",
    definition: "In Kant's ethics, the capacity of an agent to act in accordance with objective morality rather than under the influence of desires."
  },
  {
    term: "Kingdom of Ends",
    definition: "An ideal community where all members treat each other as ends in themselves and never merely as means."
  }
];

export const quizQuestions: QuizQuestion[] = [
  {
    question: "What is Kant's categorical imperative?",
    options: [
      "Act only according to personal preference",
      "Act only according to that maxim whereby you can will that it should become a universal law",
      "Act only to maximize happiness",
      "Act only according to religious doctrine"
    ],
    correctAnswer: 1,
    explanation: "The categorical imperative is Kant's central principle of ethics, stating that one should only act according to rules that could be universally applied."
  },
  {
    question: "What does 'transcendental idealism' refer to in Kant's philosophy?",
    options: [
      "The belief that material reality doesn't exist",
      "The view that space and time are absolute",
      "The doctrine that we can only know things as they appear to us, not as they are in themselves",
      "The idea that moral values are subjective"
    ],
    correctAnswer: 2,
    explanation: "Transcendental idealism is Kant's view that we can only know phenomena (appearances), not noumena (things-in-themselves)."
  },
  {
    question: "What did Kant mean by 'Sapere aude'?",
    options: [
      "Know thyself",
      "Dare to be wise",
      "Question authority",
      "Be skeptical of all claims"
    ],
    correctAnswer: 1,
    explanation: "'Sapere aude' is Latin for 'Dare to know' or 'Dare to be wise', which Kant used as the motto for the Enlightenment, encouraging people to think for themselves."
  },
  {
    question: "According to Kant, what makes an action moral?",
    options: [
      "Its consequences",
      "Its conformity with social norms",
      "The feeling it produces",
      "The duty or motivation behind it"
    ],
    correctAnswer: 3,
    explanation: "Kant's deontological ethics states that the morality of an action depends on the principle or motivation behind it, not its consequences."
  }
];
