import { Gutter } from '../_components/atoms/gutter';

export default function Page() {
  return (
    <main className="w-full h-screen flex justify-center">
      <Gutter>
        <div className="w-full">
          <h1>Email Confirmation Sent!</h1>
          <p>Please check your email to confirm your email address.</p>
        </div>
      </Gutter>
    </main>
  );
}
