import AccordionItem from "./AccordionItem";

const questions = [
  {
    question: "Sorry, what is it you guys are doing?",
    answer:
      "We take your logo and turn it into a short 6-8 second logo bumper animation based on the template You choose from our selection. So effectively - you send us a image file and we send you a short video back!",
  },
  {
    question: "Do you sell animation templates, After Effects or MOGRT files?",
    answer:
      "Nope. We are not just another marketplace that sells you a digital file and then left you hanging, wondering what to do next. With us, you skip the part where you still have to hire a motion designer to make the template work with your logo. In fact, WE ARE your motion designer - for the price of a template.",
  },
  {
    question: "How much for logo animation?",
    answer: "$99 ONLY for all bumpers in our selection.",
  },
  {
    question: "What's your turn around time?",
    answer:
      "Since we are actually real humans and designers, who make sure the logo is implemented correctly, we need up to 48 hours to get back to you with the finished video bumper. Starting from the moment we receive your logo file.",
  },
  {
    question: "Will you send me the template itself?",
    answer:
      "No. We are providing service of implementing logo into animation template. And so the end product is a logo animation, not the template itself.",
  },
];

const FAQAccordion = () => {
  return (
    <div className="flex justify-center rounded-xl px-6 pt-10 pb-30">
      <div className="max-w-[900px] rounded-t-xl rounded-b-xl overflow-hidden">
        {questions.map((q) => (
          <AccordionItem
            key={q.question}
            question={q.question}
            answer={q.answer}
          />
        ))}
      </div>
    </div>
  );
};

export default FAQAccordion;
