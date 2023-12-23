import ReactDOM from 'react-dom';

interface IPortal {
  children?: React.ReactNode;
}

export default function Portal({ children }: IPortal) {
  return ReactDOM.createPortal(
    children,
    document.getElementById('portal-root') as HTMLElement,
  );
}
