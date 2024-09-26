export function printResume() {
  const resume = env.ASSETS.fetch('/content/resume.md');
  console.log(resume);
};
