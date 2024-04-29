import toast from "react-hot-toast";
const CopyText = ({text,heading}:{text:any,heading?:string}) => {
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
        <div>
            <button className="" onClick={copyToClipboard}><p>{heading && heading} {text}</p></button>
        </div>
    );
}

export default CopyText;
