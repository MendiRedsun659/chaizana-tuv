// @ts-ignore
import photo1 from '../assets/images/photo 1.jpg';

export default function PhotoGallery() {
  return (
    <div className="w-full select-none">
      {/* Main Studio Frame Layout with one beautiful single image and no captions or controls */}
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-3 sm:p-4 border border-brand-100 shadow-md relative overflow-hidden">
        <div className="relative w-full rounded-2xl overflow-hidden bg-white/40 border border-brand-50 shadow-inner">
          <img
            src={photo1}
            alt="Выпускница Чайзана"
            className="w-full h-auto block transition-transform duration-750"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </div>
  );
}
