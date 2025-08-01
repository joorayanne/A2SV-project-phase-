'use client';
import React from 'react';

interface ModalProps {
  title?: string;
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

export default function Modal({ title, message, onConfirm, onCancel }: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-gray-900/30">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm mx-4">
        {title && <h2 className="text-lg font-bold mb-2">{title}</h2>}
        <p className="text-gray-700 mb-4">{message}</p>
        <div className="flex justify-end gap-3">
          {onCancel && (
            <button
              onClick={onCancel}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-sm"
            >
              Cancel
            </button>
          )}
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white text-sm"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
