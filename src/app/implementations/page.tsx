import { executeQuery } from "../../query";
import { CodeBlock } from "../algorithm/code-block";

export default async function UserSignUp() {
  const codes = await executeQuery<
    { code: string; variation: string; algorithm: string }[]
  >("get_code_list");

  // const code = code.code;

  return (
    <div className="flex gap-10 flex-col">
      {codes.map((code, i) => (
        <div>
          {code.algorithm} - {code.variation}
        <CodeBlock key={i}>
          {code.code}
        </CodeBlock>
        </div>
      ))}
    </div>
  );
}

// function CodeBlock({ code }: { code: string }) {
//   return (
//     <div>
//       <pre>{code}</pre>
//     </div>
//   );
// }
