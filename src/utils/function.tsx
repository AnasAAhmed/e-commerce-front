import toast from "react-hot-toast";
const CopyText = ({ text, heading }: { text: any, heading?: string }) => {
    const copyToClipboard = () => {
        navigator.clipboard.writeText(text)
            .then(() => {
                toast.success("Text Copied")
            })
            .catch(err => {
                toast.success('Could not copy text: ', err);
            });
    }

    return (
        <div className="flex flex-row">
            <span className="text-black">{heading && heading} </span>
            <button className="copy-text-btn" onClick={copyToClipboard}>
                {text}
                <span>
                 Copy Text
                </span>
            </button>
        </div>
    );
}

export default CopyText;
