import React, { useRef, useEffect } from 'react';
import QRCodeStyling from 'qr-code-styling';
const QRCodeComponent = () => {
    const qrRef = useRef(null);
    const qrCode = useRef(new QRCodeStyling({
        width: 300,
        height: 300,
        type: "svg",
        data: "https://www.facebook.com/",
       // image: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
        dotsOptions: {
            color: "#4267b2",
            type: "rounded"
        },
        backgroundOptions: {
            color: "#e9ebee",
        },
        imageOptions: {
            crossOrigin: "anonymous",
            margin: 20
        }
    }));

    useEffect(() => {
        if (qrRef.current) {
            qrCode.current.append(qrRef.current);
        }
    }, []);

    const downloadQRCode = () => {
        qrCode.current.download({ name: "facebook-qr", extension: "svg" });
    };

    return (
        <div className="flex flex-col items-center">
            <div ref={qrRef} className="mb-4" />
            <button onClick={downloadQRCode} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Download QR Code
            </button>
        </div>
    );
};

export default QRCodeComponent;
