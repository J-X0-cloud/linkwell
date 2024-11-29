/** HTTP status chip used in delivery logs: green 2xx, amber 429, red 5xx. */
export function StatusCode({ status }: { status: number }) {
  const tone = status >= 200 && status < 300 ? "c200" : status === 429 ? "c429" : "c500";
  return <span className={`code ${tone}`}>{status}</span>;
}
