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
    question: "So what is the process to get my logo animated?",
    answer:
      "Super easy! First, you select the template you like and click the little icon in the top right corner. After payment, you will be redirected to a success page from where you can upload your logo files. You will receive an email with the same instructions, in case you want to upload logo files later. That's why we ask you for your email in the checkout form.",
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
    <div className="flex flex-col items-center justify-center px-6 py-30">
      <h2 className="text-white text-3xl font-bold text-center mb-4">
        Frequently Asked Questions
      </h2>
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
