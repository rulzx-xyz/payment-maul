import React, { useState, useCallback } from 'react';
import ContentPanel from './GlassPanelWrapper';
import { IconQrcode, IconArrowLeft, IconCopy, IconDownload } from './Icons';

interface PaymentPageProps {
  onBack: () => void;
  showCopiedMessage: (type: 'qr' | 'dana') => void;
  playSound: () => void;
}

const PaymentPage: React.FC<PaymentPageProps> = ({ onBack, showCopiedMessage, playSound }) => {
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const [isQrExpanded, setIsQrExpanded] = useState(false);
  
  const qrisImageUrl = "https://files.catbox.moe/fo754s.jpg";
  const danaNumber = "0882008647756";

  const togglePaymentInfo = () => {
    playSound();
    setIsInfoVisible(prev => !prev);
  };
  
  const handleCopyDana = useCallback(() => {
    playSound();
    navigator.clipboard.writeText(danaNumber).then(() => {
      showCopiedMessage('dana');
    }).catch(err => {
      alert('Failed to copy: ' + err);
    });
  }, [showCopiedMessage, playSound]);

  const handleDownloadQR = useCallback(async () => {
    playSound();
    try {
      const response = await fetch(qrisImageUrl);
      if (!response.ok) throw new Error('Network response was not ok.');
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'dixey-payment-qr.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(link.href), 100);
      showCopiedMessage('qr');
    } catch (error) {
      console.error('QR Code download failed:', error);
      const link = document.createElement('a');
      link.href = qrisImageUrl;
      link.download = 'dixey-payment-qr.png';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showCopiedMessage('qr');
    }
  }, [qrisImageUrl, showCopiedMessage, playSound]);

  const handleQrClick = () => {
    playSound();
    setIsQrExpanded(prev => !prev);
  };

  const handleBack = () => {
    playSound();
    onBack();
  };

  return (
    <ContentPanel>
      <img src="https://files.catbox.moe/ql4jf7.jpeg" alt="Logo" className="w-36 h-36 mx-auto mb-6 rounded-full object-cover ring-4 ring-slate-200"/>
      <h1 
        className="font-['Orbitron'] text-3xl md:text-4xl my-5 uppercase tracking-[4px] text-slate-900"
      >
       ALL PAYMENTS 
      </h1>
      <div className="w-2/3 h-[1px] bg-gradient-to-r from-transparent via-slate-300 to-transparent mx-auto mt-2 mb-6"></div>
      
      <button
        onClick={togglePaymentInfo}
        className="group relative inline-flex items-center justify-center gap-3 bg-slate-900 text-white py-3 px-8 rounded-full font-['Orbitron'] font-bold text-lg tracking-wider uppercase cursor-pointer my-4 transition-all duration-300 ease-in-out hover:bg-slate-700 hover:scale-105 active:scale-100"
      >
        <IconQrcode />
        {isInfoVisible ? 'RETURN' : `CONTINUE PAYMENT`}
      </button>

      <div className={`grid transition-all duration-700 ease-in-out ${isInfoVisible ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <div className="flex flex-col items-center pt-8 gap-8">
            <div className="flex flex-col items-center w-full gap-5">
              <div className="w-full perspective-1000">
                <div 
                  className={`p-2 bg-slate-100 border border-slate-200 rounded-2xl shadow-sm transition-all duration-500 cursor-pointer inline-block ${isQrExpanded ? 'scale-[1.7] sm:scale-[1.8] my-10 z-50' : 'hover:-translate-y-1'}`}
                  onClick={handleQrClick}
                >
                  <img src={qrisImageUrl} alt="QRIS Code" className="block w-48 h-48 sm:w-52 sm:h-52 rounded-lg object-contain bg-white" />
                </div>
              </div>
              <button
                onClick={handleDownloadQR}
                className={`group relative inline-flex items-center justify-center gap-2 bg-white text-slate-800 border border-slate-300 py-3 px-8 rounded-full font-['Orbitron'] font-bold tracking-wider uppercase cursor-pointer overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg z-10 ${isQrExpanded ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'}`}
              >
                <IconDownload />
                DOWNLOAD QRIS
              </button>
              <small className={`mt-1 text-slate-500 text-sm font-semibold transition-opacity duration-300 ${isQrExpanded ? 'opacity-0' : 'opacity-100'}`}>Click Qris Untuk Mendownload Dan Memperbesar Qris</small>
            </div>
            
            <div className="w-full p-5 bg-slate-100 border border-slate-200 rounded-2xl shadow-sm">
              <div className="font-['Orbitron'] text-slate-500 mb-2.5 text-sm tracking-wider">DANA PAYMENT</div>
              <div className="text-2xl font-bold text-slate-900 break-all tracking-wider">{danaNumber}</div>
            </div>
            
            <button onClick={handleCopyDana} className="flex items-center justify-center gap-2 bg-transparent text-slate-700 border border-slate-400 py-2.5 px-6 rounded-full font-bold cursor-pointer transition-all duration-300 hover:bg-slate-100 hover:scale-105 active:scale-100 tracking-wider">
              <IconCopy />
              COPY NUMBER
            </button>
          </div>
        </div>
      </div>

      <button onClick={handleBack} className="group relative inline-flex items-center gap-2 text-slate-600 py-2.5 px-6 rounded-full font-['Orbitron'] font-bold text-sm tracking-wider uppercase cursor-pointer mt-8 transition-all duration-300 ease-in-out hover:bg-slate-200/60 hover:text-slate-900">
        <IconArrowLeft />
        BACK
      </button>
    </ContentPanel>
  );
};

export default PaymentPage;