import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

export const useCodeTyper = (codeSnippets: { text: string }[], isVisible: boolean, activeStep: number) => {
  const [typedCode, setTypedCode] = useState("");

  useEffect(() => {
    if (!isVisible) return;

    // Połącz snippet w jeden ciąg z nowymi liniami
    const fullCode = codeSnippets.map(line => line.text).join('\n');

    // Animacja z GSAP
    const tl = gsap.timeline();
    // 1. Efekt "Glitch" (szybkie tasowanie znaków) przed czyszczeniem
    tl.to({ val: typedCode }, {
      duration: 0.3,
      val: typedCode.split('').map(() => "█▓▒░"[Math.floor(Math.random() * 4)]).join(''),
      onUpdate: function() {
        setTypedCode(this.targets()[0].val);
      },
      ease: 'steps(10)'
    });
    // 2. Czyszczenie tekstu
    tl.to({ val: typedCode.length }, {
      duration: 0.5,
      val: 0,
      onUpdate: function() {
        setTypedCode(prev => prev.substring(0, this.targets()[0].val));
      },
      ease: 'power2.inOut'
    });
    // 3. Pisanie nowego kodu
    tl.to({ val: "" }, {
      duration: fullCode.length * 0.02, // Szybkość pisania
      val: fullCode,
      onUpdate: function() {
        setTypedCode(this.targets()[0].val);
      },
      ease: 'none'
    });
    
    return () => {
      tl.kill(); // Wyczyść animację, gdy komponent się odmontuje
    };
  }, [isVisible, activeStep]); // Uruchom ponownie tylko przy zmianie kroku

  return typedCode;
};
