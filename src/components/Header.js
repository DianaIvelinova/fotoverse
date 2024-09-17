import { Navbar,Nav,Button,Modal } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.css";
import { useRouter } from 'next/router';
import { useUser, userSignOut } from '@fotoverse/hooks/useUser';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  const { user } = useUser();
  const router = useRouter();

  console.log(user?.uid, "user id");

  const logout = () => {
    userSignOut();
    router.push("/");
  };

  return (
    <div >
    <header>
        <div className='d-flex justify-content-between align-items-center'>
            <Link href="${user?.uid}" className="m-2 gradient-text">
                <h1>fotoverse</h1>
            </Link>
            <div>
              <div className='header_copyright'>diyana ivanova © 2024</div>
            </div>
            <Nav className="nav-links">
              <Nav.Link className='nav-item' href="/home">
                <Image alt="" width={25} height={25} src="./home.svg" />
                <span className="nav-text">Feed</span>
              </Nav.Link>
              <Nav.Link className='nav-item p-2 me-2' onClick={logout}>
                <Image alt="" width={20} height={20} src="./logout.svg" />
                <span className="nav-text">Logout</span>
              </Nav.Link>
            </Nav>
        </div>
    </header>
    </div>
  );
}
