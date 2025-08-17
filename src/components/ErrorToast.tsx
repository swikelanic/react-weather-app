interface Props {
  message: string;
}

export default function ErrorToast({ message }: Props) {
  return <div className="error-toast">⚠️ {message}</div>;
}
