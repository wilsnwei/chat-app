import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, Trash, Trash2Icon, TrashIcon, X } from "lucide-react";

const ChatInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const selectedUser = useChatStore((state) => state.selectedUser);
  const sendMessage = useChatStore((state) => state.sendMessage);

  const handleImageSelect = async (e) => {
    const file = e.target.files[0];

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const removeImagePreview = () => {
    setImagePreview(null);
    if (fileInputRef) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) {
      return;
    }
    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });
      setText("");
      setImagePreview(null);
      if (fileInputRef) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Error sending message", error);
      toast.error("Failed to send message");
    }
  };

  return (
    <div className="w-full p-4">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              className="absolute -top-1.5 cursor-pointer hover:bg-base-200 -right-1.5 w-8 h-8 rounded-md bg-base-300 flex items-center justify-center transition-colors"
              type="button"
              onClick={removeImagePreview}
            >
              <Trash2Icon className="size-5 hover:text-red-500 text-red-800 transition-colors" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex flex-1 gap-2">
          <button
            className={`hidden btn btn-circle sm:flex ${
              imagePreview ? "text-emera" : "text-zinc-400"
            }`}
            type="button"
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20} />
          </button>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="input w-full input-bordered rounded-lg input-sm sm:input-md"
            placeholder={`Message ${selectedUser.fullName}`}
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageSelect}
            className="hidden"
          />
        </div>
        <button
          className="btn btn-md btn-circle"
          disabled={!text.trim() && !imagePreview}
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
