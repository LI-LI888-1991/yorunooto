import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'icon';
    size?: 'md' | 'lg' | 'icon';
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'md',
    children,
    className = '',
    ...props
}) => {
    const baseStyles = 'inline-flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none font-medium';

    const variants = {
        primary: 'bg-gradient-to-br from-accent to-accent-light text-white shadow-[0_0_40px_rgba(127,90,240,0.3)] hover:shadow-[0_0_60px_rgba(127,90,240,0.5)] hover:-translate-y-0.5',
        secondary: 'bg-background-card/60 backdrop-blur-md border border-white/10 text-text-primary hover:bg-accent/20 hover:border-accent',
        icon: 'p-0 rounded-full bg-background-card/60 border border-white/10 text-text-primary hover:bg-accent/20',
    };

    const sizes = {
        md: 'px-8 py-4 rounded-full text-base',
        lg: 'px-12 py-5 rounded-full text-lg',
        icon: 'w-12 h-12 rounded-full',
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
