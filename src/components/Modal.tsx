export default function Modal({ children }: any) {
  return (
    <div className="w-full h-full fixed flex items-center justify-center z-20">
      <div className="w-4/5 h-6/7 p-8 modal fixed bg-white border shadow flex flex-col gap-3 items-center justify-center">
        {children}
      </div>
    </div>
  );
}
