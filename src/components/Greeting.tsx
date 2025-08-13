import { createSignal, onCleanup } from "solid-js";

const techStack = ['"Frontend"', '"TypeScript"', '"React"', '"JavaScript"'];
const nameVariants = ["서채연", "🍒", "채리"];

export default function Greeting() {
  const [greeting, setGreeting] = createSignal("안녕하세요:)");
  const [tech, setTech] = createSignal(techStack[0]);
  const [name, setName] = createSignal(nameVariants[0]);
  const [isBlurring, setIsBlurring] = createSignal(false);

  let techIndex = 0;
  let nameIndex = 0;

  const changeTech = () => {
    setIsBlurring(true);
    setTimeout(() => {
      techIndex = (techIndex + 1) % techStack.length;
      setTech(techStack[techIndex]);
      setIsBlurring(false);
    }, 2000);
  };

  const changeName = () => {
    setIsBlurring(true);
    setTimeout(() => {
      nameIndex = (nameIndex + 1) % nameVariants.length;
      setName(nameVariants[nameIndex]);
      setIsBlurring(false);
    }, 2000);
  };

  const techInterval = setInterval(changeTech, 4000);

  const nameInterval = setInterval(changeName, 4000);

  onCleanup(() => {
    clearInterval(techInterval);
    clearInterval(nameInterval);
  });

  return (
    <div class="mt-20 p-5 text-start text-4xl font-light">
      <div class="mb-2.5">{greeting()}</div>

      <div class="flex items-center">
        <div
          class={`rounded-xl font-semibold transition-all duration-1000 ${
            isBlurring() ? "blur-lg animate-pulse" : ""
          }`}
          style={{
            animation: isBlurring() ? "colorchange 1s infinite, expandWidth 1s" : "none",
          }}
        >
          {tech()}
        </div>
        <div>를 좋아하는</div>
      </div>

      <div class="flex gap-2.5 mt-2.5">
        개발자
        <div class="flex gap-1">
          <div
            class={`rounded-xl font-semibold transition-all duration-1000 ${
              isBlurring() ? "blur-lg animate-pulse" : ""
            }`}
            style={{
              animation: isBlurring() ? "colorchange 1s infinite, expandWidth 1s" : "none",
            }}
          >
            {name()}
          </div>
          입니다.
        </div>
      </div>
    </div>
  );
}
